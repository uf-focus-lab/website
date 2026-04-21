const modules = import.meta.glob("./people/*.{webp,jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function stem(path: string): string {
  return path
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "");
}

export default Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [stem(path), url]),
) as Record<string, string>;
