export const getLevelBadgeVariant = (
  level: string,
): "default" | "secondary" | "outline" => {
  switch (level) {
    case "high":
      return "default"
    case "medium":
      return "secondary"
    default:
      return "outline"
  }
}
