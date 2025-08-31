from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import os
from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

# Configure CORS
origins = [
    os.environ.get("FRONTEND_URL", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in backend/.env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def get_supabase_client() -> Client:
    return supabase

async def verify_token(authorization: str = Header(...)):
    """
    Verifies the Supabase JWT token from the Authorization header.
    This function now provides more specific error handling to aid in debugging.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    token = authorization.replace("Bearer ", "").strip()
    if not token:
        raise HTTPException(status_code=401, detail="Token is missing or empty")

    try:
        # Ask Supabase Auth to validate the token.
        # This will raise an AuthApiError if the token is invalid or expired.
        user_resp = supabase.auth.get_user(token)
        user = getattr(user_resp, "user", None)
        
        if not user:
            # This is a fallback, as get_user should raise an error before this.
            raise HTTPException(status_code=401, detail="User not found for this token")

        # Normalize the payload to return the user's ID and email.
        payload = {
            "sub": str(user.id),
            "email": getattr(user, "email", None),
        }
        return payload
    except Exception as e:
        # Catch any other unexpected errors during token verification.
        print(f"An unexpected error occurred during token verification: {e}")
        raise HTTPException(status_code=500, detail="Error verifying token")


class LocationDistrictEnum(str, Enum):
    REMOTE = 'REMOTE'
    MID_LEVELS = 'MID_LEVELS'
    POK_FU_LAM = 'POK_FU_LAM'
    CENTRAL_AND_SHEUNG_WAN = 'CENTRAL_AND_SHEUNG_WAN'
    SAI_WAN = 'SAI_WAN'
    WAN_CHAI = 'WAN_CHAI'
    CAUSEWAY_BAY = 'CAUSEWAY_BAY'
    HAPPY_VALLEY = 'HAPPY_VALLEY'
    NORTH_POINT = 'NORTH_POINT'
    QUARRY_BAY = 'QUARRY_BAY'
    TAI_KOO = 'TAI_KOO'
    SHAU_KEI_WAN = 'SHAU_KEI_WAN'
    SAI_WAN_HO = 'SAI_WAN_HO'
    CHAI_WAN = 'CHAI_WAN'
    SIU_SAI_WAN = 'SIU_SAI_WAN'
    ABERDEEN = 'ABERDEEN'
    AP_LEI_CHAU = 'AP_LEI_CHAU'
    STANLEY = 'STANLEY'
    MONG_KOK = 'MONG_KOK'
    LAM_TIN = 'LAM_TIN'
    YAU_TONG = 'YAU_TONG'
    SAU_MAU_PING = 'SAU_MAU_PING'
    KWUN_TONG = 'KWUN_TONG'
    NGAU_TAU_KOK = 'NGAU_TAU_KOK'
    KOWLOON_BAY = 'KOWLOON_BAY'
    CHOI_HUNG = 'CHOI_HUNG'
    NGAU_CHI_WAN = 'NGAU_CHI_WAN'
    TSZ_WAN_SHAN = 'TSZ_WAN_SHAN'
    DIAMOND_HILL = 'DIAMOND_HILL'
    SAN_PO_KONG = 'SAN_PO_KONG'
    WONG_TAI_SIN = 'WONG_TAI_SIN'
    LOK_FU = 'LOK_FU'
    KOWLOON_TONG = 'KOWLOON_TONG'
    SHEK_KIP_MEI = 'SHEK_KIP_MEI'
    HO_MAN_TIN = 'HO_MAN_TIN'
    KOWLOON_CITY = 'KOWLOON_CITY'
    TO_KWA_WAN = 'TO_KWA_WAN'
    HUNG_HOM = 'HUNG_HOM'
    YAU_MA_TEI = 'YAU_MA_TEI'
    JORDAN = 'JORDAN'
    TSIM_SHA_TSUI = 'TSIM_SHA_TSUI'
    TAI_KOK_TSUI = 'TAI_KOK_TSUI'
    SHAM_SHUI_PO = 'SHAM_SHUI_PO'
    CHEUNG_SHA_WAN = 'CHEUNG_SHA_WAN'
    LAI_CHI_KOK = 'LAI_CHI_KOK'
    MEI_FOO = 'MEI_FOO'
    TSEUNG_KWAN_O = 'TSEUNG_KWAN_O'
    SAI_KUNG = 'SAI_KUNG'
    TSUEN_WAN = 'TSUEN_WAN'
    KWAI_FONG = 'KWAI_FONG'
    KWAI_HING = 'KWAI_HING'
    KWAI_CHUNG = 'KWAI_CHUNG'
    TSING_YI = 'TSING_YI'
    LAI_KING_STATION = 'LAI_KING_STATION'
    TAI_WAI = 'TAI_WAI'
    SHA_TIN_TOWN_CENTRE = 'SHA_TIN_TOWN_CENTRE'
    SIU_LIK_YUEN = 'SIU_LIK_YUEN'
    FO_TAN = 'FO_TAN'
    MA_ON_SHAN = 'MA_ON_SHAN'
    TAI_PO = 'TAI_PO'
    FANLING = 'FANLING'
    SHEUNG_SHUI = 'SHEUNG_SHUI'
    YUEN_LONG = 'YUEN_LONG'
    TIN_SHUI_WAI = 'TIN_SHUI_WAI'
    TUEN_MUN = 'TUEN_MUN'
    ISLANDS_DISTRICT = 'ISLANDS_DISTRICT'
    TSING_LUNG_TAU = 'TSING_LUNG_TAU'
    SHAM_TSENG = 'SHAM_TSENG'
    MA_WAN = 'MA_WAN'
    TUNG_CHUNG = 'TUNG_CHUNG'

class SubjectEnum(str, Enum):
    ENGLISH = 'ENGLISH'
    CHINESE = 'CHINESE'
    MATHEMATICS = 'MATHEMATICS'
    PHYSICS = 'PHYSICS'
    CHEMISTRY = 'CHEMISTRY'
    BIOLOGY = 'BIOLOGY'
    ECONOMICS = 'ECONOMICS'
    GEOGRAPHY = 'GEOGRAPHY'
    HISTORY = 'HISTORY'
    CHINESE_HISTORY = 'CHINESE_HISTORY'
    BAFS = 'BAFS'
    LIBERAL_STUDIES = 'LIBERAL_STUDIES'
    GENERAL_SCIENCE = 'GENERAL_SCIENCE'
    MUSIC = 'MUSIC'
    VISUAL_ARTS = 'VISUAL_ARTS'
    OTHER = 'OTHER'

class TutoringRecordCreate(BaseModel):
    price_per_hour: float
    currency: str
    subject: SubjectEnum
    location_district: LocationDistrictEnum
    tutor_academic_result: Optional[str] = None
    student_condition: str
    parent_satisfaction: Optional[int] = Field(None, ge=1, le=5)
    tutoring_experience: Optional[int] = Field(None, ge=0)

@app.get("/")
def read_root():
    return {"message": "SmartTutor API"}

@app.post("/records")
async def create_record(
    record: TutoringRecordCreate,
    user: dict = Depends(verify_token),
    db: Client = Depends(get_supabase_client),
):
    user_id = user.get("sub")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID not found in token")

    try:
        # Upsert contributor
        contributor_data = {
            "id": user_id,
            "has_contributed": True,
            "tutoring_experience": record.tutoring_experience,
        }
        db.table("contributors").upsert(contributor_data, on_conflict="id").execute()

        # Insert tutoring record (serialize enums to string values)
        rec = record.model_dump()
        rec["contributor_id"] = user_id
        rec["subject"] = record.subject.value
        rec["location_district"] = record.location_district.value

        result = db.table("tutoring_records").insert(rec).execute()
        if not result.data:
            raise HTTPException(status_code=500, detail="Insert failed")

        return {
            "success": True,
            "message": "Record submitted successfully",
            "record_id": result.data[0]["id"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 