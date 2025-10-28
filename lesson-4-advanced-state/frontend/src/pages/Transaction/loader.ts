import type { Transaction } from "@/types/Transaction";
import ApiClient from "../../lib/api";

export interface LoaderData {
    transactions : Transaction[];
}

export async function loader(): Promise<LoaderData> {
    try {
        const transactions = (await ApiClient.getTransactions()) ?? [];
        return { transactions };
    } catch (err) {
        console.error("Failed to load transactions:", err);
        return { transactions: [] };
    }
}