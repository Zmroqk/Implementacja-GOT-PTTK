import { Badge } from "./Badge.entity";

export interface BadgeLevel {
   id: number
   level: string
   badges: Badge[]
}