from abc import ABC, abstractmethod
from typing import List, Dict, Any

class SourceAdapter(ABC):
    """
    Base class for all data source adapters (CSV, API, JSON, Government DB).
    """

    @abstractmethod
    async def fetch(self) -> List[Dict[str, Any]]:
        """Fetch raw data from the source."""
        pass

    @abstractmethod
    def normalize(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Apply normalization rules."""
        pass

    @abstractmethod
    def validate(self, normalized_data: List[Dict[str, Any]]) -> bool:
        """Ensure data meets minimum requirements."""
        pass

class CSVAdapter(SourceAdapter):
    def __init__(self, file_path: str):
        self.file_path = file_path

    async def fetch(self) -> List[Dict[str, Any]]:
        # Implementation for reading CSV
        return []

    def normalize(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Use Normalizer
        return []

    def validate(self, normalized_data: List[Dict[str, Any]]) -> bool:
        return True
