'use server';

import { eq } from "drizzle-orm";
import { db } from "./db";
import { users, quizzes, reports } from "./db/schema";

export async function upsertUser(userData: {
  id: string;
  name: string;
  email: string;
}) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.id, userData.id));

  if (existingUser.length === 0) {
    await db.insert(users).values(userData);
  }

  return userData.id;
}

export async function createQuizRecord(quizData: {
    userId: string;
    quizType: string;
    responses: any;
  }) {
    const [quiz] = await db
      .insert(quizzes)
      .values({
        userId: quizData.userId,
        quizType: quizData.quizType,
        responses: quizData.responses,
      })
      .returning();
  
    return quiz.id;
}

export async function createReportRecord(reportData: {
    userId: string;
    quizId: string;
    reportData: any;
  }) {
    await db.insert(reports).values({
      userId: reportData.userId,
      quizId: reportData.quizId,
      reportData: reportData.reportData,
    });
}
  
  