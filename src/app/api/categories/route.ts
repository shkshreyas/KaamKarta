import { Category } from "@/interfaces/service";
import { db } from "@/utils/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<
  NextResponse<{ categories: Category[] } | { error: string }>
> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("searchTerm");

    // Build the Firestore query based on the searchTerm
    const categoriesRef = searchTerm
      ? db
          .collection("categories")
          .where("name", ">=", searchTerm)
          .where("name", "<=", searchTerm + "\uf8ff")
      : db.collection("categories");

    // Fetch data from Firestore
    const categoriesSnapshot = await categoriesRef.get();

    // Transform the Firestore documents into a Category array
    const categories = categoriesSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }) as Category[];

    // Respond with the fetched categories
    return NextResponse.json(
      { categories },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);

    // Respond with an error message
    return NextResponse.json(
      { error: "Failed to fetch categories. Please try again later." },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
