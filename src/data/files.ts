"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { validate_user_token } from "./users/validate_user";
import { writeFile, readFile } from "fs/promises";
import path from "path";
import { db } from "~/server/db";
import { patient_documents } from "~/server/db/schema";
import { CreationResult, FetchResult, file_schema } from "~/types";
import { eq, InferSelectModel } from "drizzle-orm";

const form_schema = zfd.formData({
    user_token: zfd.text(),
    patient_id: zfd.numeric(z.number().int().min(0)),
    file_name: zfd.text(),
    file: file_schema,
});

export async function upload_file(form: FormData): Promise<CreationResult> {
    const res = form_schema.safeParse(form);

    if (res.error)
        return {
            success: false,
            error_msg: "Error in the form data"
        }

    const { user_token, patient_id, file, file_name } = res.data;
    const user = validate_user_token(user_token);

    if (!user)
        return {
            success: false,
            error_msg: "Invalid user"
        }

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const route = `files/${(new Date()).getTime()}.${file.type.split("/")[1]}`;
        const file_path = path.join(process.cwd(), route);

        await writeFile(file_path, buffer);
        await db.insert(patient_documents).values({
            patient_id,
            route,
            name: file_name
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
            error_msg: "Error uploading file"
        }
    }

    return {
        success: true,
        msg: "File succesfully uploaded"
    };
}

async function createFileFromLocalPath(db_path: string, file_name: string) {
    try {
        const file_path = path.join(process.cwd(), db_path);
        const file_buffer = await readFile(file_path);
        const blob = new File([file_buffer], file_name);
        const fileName = db_path.split('/').pop() as string;

        const file = new File([blob], fileName, {
            type: blob.type,
            lastModified: Date.now()
        });

        return file;
    } catch (error) {
        console.error('Error fetching the file:', error);
        return null;
    }
}

async function createBlobFromLocalPath(db_path: string, file_name: string) {
    try {
        const file_path = path.join(process.cwd(), db_path);
        return await readFile(file_path);
    } catch (error) {
        console.error('Error fetching the file:', error);
        return null;
    }
}

type PatientDocumentModel = InferSelectModel<typeof patient_documents>;

export async function get_patient_documents(patient_id: number): Promise<FetchResult<PatientDocumentModel>> {
    const db_file_records = await db.select().from(patient_documents).where(eq(patient_documents.patient_id, patient_id));
    return {
        success: true,
        data: db_file_records
    };
}

export type DocumentWithBuffer = PatientDocumentModel & { buffer: string };

export async function get_document_by_id(doc_id: number): Promise<FetchResult<DocumentWithBuffer>> {
    const db_file_records = await db.select().from(patient_documents).where(eq(patient_documents.id, doc_id));
    const files = (await Promise.all(
        db_file_records.map(async (file) => {
            const buffer = await createBlobFromLocalPath(file.route, file.name);
            return {
                ...file,
                buffer: buffer ? buffer.toString("base64") : null
            }
        })
    ))
        .filter(document => document.buffer !== null) as DocumentWithBuffer[];

    return {
        success: true,
        data: files
    };
}