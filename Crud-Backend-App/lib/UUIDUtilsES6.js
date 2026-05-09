import { v4 as uuidv4, v1 as uuidv1 } from "uuid";

export function generateUUID(version) {
  if (version === 1) return uuidv1();
  if (version === 4) return uuidv4();
  return "";
}
