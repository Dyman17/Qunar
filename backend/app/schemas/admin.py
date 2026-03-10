"""
QUNAR Admin DB Schemas
"""

from typing import Any

from pydantic import BaseModel


class TableColumn(BaseModel):
    name: str
    type: str
    nullable: bool
    primary_key: bool
    default: str | None = None


class TableListResponse(BaseModel):
    tables: list[str]


class TableDataResponse(BaseModel):
    table: str
    primary_key: str | None
    columns: list[TableColumn]
    rows: list[dict[str, Any]]
    limit: int
    offset: int
    total: int


class ActionResponse(BaseModel):
    message: str
    affected: int
    id: Any | None = None
