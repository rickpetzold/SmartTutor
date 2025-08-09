-- Create custom enum types
CREATE TYPE public.location_district AS ENUM (
    'REMOTE', 'MID_LEVELS', 'POK_FU_LAM', 'CENTRAL_AND_SHEUNG_WAN', 'SAI_WAN', 'WAN_CHAI', 'CAUSEWAY_BAY', 'HAPPY_VALLEY', 'NORTH_POINT', 'QUARRY_BAY', 'TAI_KOO', 'SHAU_KEI_WAN', 'SAI_WAN_HO', 'CHAI_WAN', 'SIU_SAI_WAN', 'ABERDEEN', 'AP_LEI_CHAU', 'STANLEY', 'MONG_KOK', 'LAM_TIN', 'YAU_TONG', 'SAU_MAU_PING', 'KWUN_TONG', 'NGAU_TAU_KOK', 'KOWLOON_BAY', 'CHOI_HUNG', 'NGAU_CHI_WAN', 'TSZ_WAN_SHAN', 'DIAMOND_HILL', 'SAN_PO_KONG', 'WONG_TAI_SIN', 'LOK_FU', 'KOWLOON_TONG', 'SHEK_KIP_MEI', 'HO_MAN_TIN', 'KOWLOON_CITY', 'TO_KWA_WAN', 'HUNG_HOM', 'YAU_MA_TEI', 'JORDAN', 'TSIM_SHA_TSUI', 'TAI_KOK_TSUI', 'SHAM_SHUI_PO', 'CHEUNG_SHA_WAN', 'LAI_CHI_KOK', 'MEI_FOO', 'TSEUNG_KWAN_O', 'SAI_KUNG', 'TSUEN_WAN', 'KWAI_FONG', 'KWAI_HING', 'KWAI_CHUNG', 'TSING_YI', 'LAI_KING_STATION', 'TAI_WAI', 'SHA_TIN_TOWN_CENTRE', 'SIU_LIK_YUEN', 'FO_TAN', 'MA_ON_SHAN', 'TAI_PO', 'FANLING', 'SHEUNG_SHUI', 'YUEN_LONG', 'TIN_SHUI_WAI', 'TUEN_MUN', 'ISLANDS_DISTRICT', 'TSING_LUNG_TAU', 'SHAM_TSENG', 'MA_WAN', 'TUNG_CHUNG'
);

CREATE TYPE public.subject AS ENUM (
    'ENGLISH', 'CHINESE', 'MATHEMATICS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'ECONOMICS', 'GEOGRAPHY', 'HISTORY', 'CHINESE_HISTORY', 'BAFS', 'LIBERAL_STUDIES', 'GENERAL_SCIENCE', 'MUSIC', 'VISUAL_ARTS', 'OTHER'
);

-- Create the contributors table
CREATE TABLE public.contributors (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id),
    has_contributed boolean DEFAULT false NOT NULL,
    tutoring_experience integer
);

-- Create the tutoring_records table
CREATE TABLE public.tutoring_records (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    contributor_id uuid NOT NULL REFERENCES public.contributors(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    price_per_hour numeric NOT NULL,
    currency text NOT NULL,
    location_district public.location_district,
    subject public.subject,
    tutor_academic_result text,
    student_condition text,
    parent_satisfaction integer
);

-- Add comments to the tables and columns
COMMENT ON TABLE public.contributors IS 'Stores information about anonymous contributors.';
COMMENT ON TABLE public.tutoring_records IS 'Stores anonymous data about tutoring sessions.';
