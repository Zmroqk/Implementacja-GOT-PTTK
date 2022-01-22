import { Badge } from "./Badge.entity";

export interface BadgeType {
   id: number
   type: string
   badges: Badge[]
}