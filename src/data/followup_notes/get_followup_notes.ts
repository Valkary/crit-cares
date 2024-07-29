'use server'
import { type InferSelectModel, and, desc, eq, sql } from 'drizzle-orm'
import jwt from 'jsonwebtoken'

import { z } from 'zod'
import { env } from '~/env'
import { db } from '~/server/db'
import { follow_up_notes, patients, users } from '~/server/db/schema'
import type { FetchResult, User } from '~/types'

const get_patient_followup_notes_schema = z.object({
  user_token: z.string(),
  patient_id: z.number(),
})

type GetFollowupNotesSchema = z.infer<typeof get_patient_followup_notes_schema>
export type FollowupNoteModel = InferSelectModel<typeof follow_up_notes>

export async function get_followup_notes(
  follow_up_notes_patient_req: GetFollowupNotesSchema,
): Promise<FetchResult<FollowupNoteModel>> {
  const res = get_patient_followup_notes_schema.safeParse(
    follow_up_notes_patient_req,
  )

  if (res.error)
    return {
      success: false,
      error_msg: JSON.stringify(res.error),
    }

  const { patient_id, user_token } = res.data

  try {
    const { email } = jwt.verify(user_token, env.JWT_SECRET) as User
    const doctor = (
      await db.select().from(users).where(eq(users.email, email))
    )[0]

    if (!doctor)
      return {
        success: false,
        error_msg: 'Usuario erroneo',
      }

    return {
      success: true,
      data: await db
        .select()
        .from(follow_up_notes)
        .where(
          and(
            eq(follow_up_notes.doctor_id, doctor.id),
            eq(follow_up_notes.patient_id, patient_id),
          ),
        )
        .orderBy(desc(follow_up_notes.creation_date)),
    }
  } catch (err) {
    return {
      success: false,
      error_msg: 'Error fetching notes',
    }
  }
}

export async function get_patient_notes(patient_id: number) {
  return await db
    .select()
    .from(follow_up_notes)
    .where(eq(follow_up_notes.patient_id, patient_id))
}
