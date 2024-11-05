// Type definition for formatDate function
export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid Date object");
  }

  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

// Type definition for dateFormatter function
export function dateFormatter(dateString: string): string {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// Type definition for getInitials function
export function getInitials(fullName: string): string {
  if (!fullName) return "";

  const names = fullName.split(" ");
  const initials = names.slice(0, 2).map((name) => name[0]?.toUpperCase() || "");
  const initialsStr = initials.join("");

  return initialsStr;
}

// Enum for priority styles with TypeScript types
export const PRIORITY_STYLES: Record<string, string> = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

// Enum for task types with TypeScript types
export const TASK_TYPE: Record<string, string> = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

// Constant for background styles array
export const BGS: string[] = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
