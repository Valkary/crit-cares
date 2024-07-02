"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { validate_user_token } from "./users/validate_user";
import { writeFile, readFile } from "fs/promises";
import path from "path";
import { db } from "~/server/db";
import { patient_documents } from "~/server/db/schema";
import { CreationResult, FetchResult } from "~/types";
import { eq } from "drizzle-orm";

const MAX_FILE_SIZE = 10000000;

const ACCEPTED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
];

const file_schema = z
    .instanceof(File)
    .refine((file) => {
        if (file.size === 0 || file.name === undefined) return false;
        else return true;
    }, "Please update or add new file.")
    .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`);

const form_schema = zfd.formData({
    user_token: zfd.text(),
    patient_id: zfd.numeric(z.number().int().min(0)),
    file: file_schema,
});

function create_file_name(type: string) {
    return `${Date.now().toString()}.${type.split("/")[1]}`;
}

export async function upload_file(form: FormData): Promise<CreationResult> {
    const res = form_schema.safeParse(form);

    console.info(res.error);

    if (res.error)
        return {
            success: false,
            error_msg: "Error in the form data"
        }

    const { user_token, patient_id, file } = res.data;
    const user = validate_user_token(user_token);

    if (!user)
        return {
            success: false,
            error_msg: "Invalid user"
        }

    const buffer = Buffer.from(await file.arrayBuffer());
    const file_name = create_file_name(file.type);

    try {
        const route = "files/" + file_name;
        const file_path = path.join(process.cwd(), route);

        await writeFile(file_path, buffer);
        await db.insert(patient_documents).values({
            patient_id,
            route,
            name: file.name
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

export async function get_patient_documents(patient_id: number): Promise<FetchResult<File>> {
    const db_file_records = await db.select().from(patient_documents).where(eq(patient_documents.patient_id, patient_id));
    const files = (await Promise.all(
        db_file_records.map(async (file) => await createFileFromLocalPath(file.route, file.name))
    )).filter(file => file instanceof (File)) as File[];

    return {
        success: true,
        data: files
    };
}