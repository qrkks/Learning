from ninja import Schema
from datetime import datetime

class WaitlistEntryCreateSchema(Schema):
    # in 
    email: str

class WaitlistEntryListSchema(Schema):
    # out
    id: int
    email: str
    
class WaitlistEntryDetailSchema(Schema):
    # out
    id: int
    email: str
    updated: datetime
    timestamp: datetime