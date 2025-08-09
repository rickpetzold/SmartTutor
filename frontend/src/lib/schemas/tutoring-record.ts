import { z } from 'zod'

// Matches the enums in backend/main.py and the database
const LocationDistrictEnum = z.enum([
  'REMOTE',
  'MID_LEVELS',
  'POK_FU_LAM',
  'CENTRAL_AND_SHEUNG_WAN',
  'SAI_WAN',
  'WAN_CHAI',
  'CAUSEWAY_BAY',
  'HAPPY_VALLEY',
  'NORTH_POINT',
  'QUARRY_BAY',
  'TAI_KOO',
  'SHAU_KEI_WAN',
  'SAI_WAN_HO',
  'CHAI_WAN',
  'SIU_SAI_WAN',
  'ABERDEEN',
  'AP_LEI_CHAU',
  'STANLEY',
  'MONG_KOK',
  'LAM_TIN',
  'YAU_TONG',
  'SAU_MAU_PING',
  'KWUN_TONG',
  'NGAU_TAU_KOK',
  'KOWLOON_BAY',
  'CHOI_HUNG',
  'NGAU_CHI_WAN',
  'TSZ_WAN_SHAN',
  'DIAMOND_HILL',
  'SAN_PO_KONG',
  'WONG_TAI_SIN',
  'LOK_FU',
  'KOWLOON_TONG',
  'SHEK_KIP_MEI',
  'HO_MAN_TIN',
  'KOWLOON_CITY',
  'TO_KWA_WAN',
  'HUNG_HOM',
  'YAU_MA_TEI',
  'JORDAN',
  'TSIM_SHA_TSUI',
  'TAI_KOK_TSUI',
  'SHAM_SHUI_PO',
  'CHEUNG_SHA_WAN',
  'LAI_CHI_KOK',
  'MEI_FOO',
  'TSEUNG_KWAN_O',
  'SAI_KUNG',
  'TSUEN_WAN',
  'KWAI_FONG',
  'KWAI_HING',
  'KWAI_CHUNG',
  'TSING_YI',
  'LAI_KING_STATION',
  'TAI_WAI',
  'SHA_TIN_TOWN_CENTRE',
  'SIU_LIK_YUEN',
  'FO_TAN',
  'MA_ON_SHAN',
  'TAI_PO',
  'FANLING',
  'SHEUNG_SHUI',
  'YUEN_LONG',
  'TIN_SHUI_WAI',
  'TUEN_MUN',
  'ISLANDS_DISTRICT',
  'TSING_LUNG_TAU',
  'SHAM_TSENG',
  'MA_WAN',
  'TUNG_CHUNG',
])

const SubjectEnum = z.enum([
  'ENGLISH',
  'CHINESE',
  'MATHEMATICS',
  'PHYSICS',
  'CHEMISTRY',
  'BIOLOGY',
  'ECONOMICS',
  'GEOGRAPHY',
  'HISTORY',
  'CHINESE_HISTORY',
  'BAFS',
  'LIBERAL_STUDIES',
  'GENERAL_SCIENCE',
  'MUSIC',
  'VISUAL_ARTS',
  'OTHER',
])

export const tutoringRecordSchema = z.object({
  price_per_hour: z.coerce
    .number()
    .positive({ message: 'Price must be a positive number.' }),
  currency: z
    .string()
    .min(3, { message: 'Currency must be 3 characters.' })
    .max(3),
  subject: SubjectEnum,
  location_district: LocationDistrictEnum,
  tutor_academic_result: z.string().optional(),
  student_condition: z
    .string()
    .min(1, { message: 'Student condition is required.' }),
  parent_satisfaction: z.coerce.number().min(1).max(5).optional(),
  tutoring_experience: z.coerce
    .number()
    .nonnegative({ message: 'Experience cannot be negative.' })
    .optional(),
})

export type TutoringRecordFormValues = z.infer<typeof tutoringRecordSchema>
