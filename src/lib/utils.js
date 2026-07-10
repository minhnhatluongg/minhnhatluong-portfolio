/**
 * cn() - Class name helper (chuẩn shadcn/ui, dùng cho các component Joly UI)
 *
 * Kết hợp clsx (conditional classes) + tailwind-merge (xử lý conflict giữa
 * các Tailwind class, ví dụ "px-6" đè "px-4" thay vì giữ cả hai).
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
