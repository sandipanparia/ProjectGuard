import re
from typing import Optional

class Normalizer:
    @staticmethod
    def parse_currency(value: str) -> Optional[float]:
        if not value:
            return None
        value = str(value).lower().replace("inr", "").replace("₹", "").replace(",", "").strip()
        
        multiplier = 1
        if "lakh" in value:
            multiplier = 100000
            value = value.replace("lakh", "").strip()
        elif "crore" in value or "cr" in value:
            multiplier = 10000000
            value = value.replace("crore", "").replace("cr", "").strip()
            
        try:
            return float(value) * multiplier
        except ValueError:
            return None

    @staticmethod
    def parse_status(status: str) -> str:
        if not status:
            return "SANCTIONED"
        s = status.upper().strip()
        mapping = {
            "ONGOING": "IN_PROGRESS",
            "WORK IN PROGRESS": "IN_PROGRESS",
            "FINISHED": "COMPLETED",
            "COMPLETE": "COMPLETED",
        }
        return mapping.get(s, s)

    @staticmethod
    def normalize_entity_name(name: str) -> str:
        if not name:
            return ""
        # Remove extra spaces, special chars, uppercase
        return re.sub(r'\s+', ' ', name).strip().upper()
