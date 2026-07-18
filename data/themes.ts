export type ThemeId = "matrix" | "dracula" | "nord" | "powershell" | "amber";

export const themes: { id: ThemeId; label: string }[] = [
  { id: "matrix", label: "Matrix Green" },
  { id: "dracula", label: "Dracula" },
  { id: "nord", label: "Nord" },
  { id: "powershell", label: "PowerShell Blue" },
  { id: "amber", label: "Amber CRT" },
];

export const defaultTheme: ThemeId = "matrix";
export const themeStorageKey = "portfolio-theme";
