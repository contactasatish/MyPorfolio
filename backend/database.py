from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from models import *
import os
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, client: AsyncIOMotorClient, db_name: str):
        self.client = client
        self.db = client[db_name]
        
    # Contact Management
    async def create_contact_message(self, message: ContactMessage) -> ContactMessage:
        try:
            result = await self.db.contact_messages.insert_one(message.dict())
            logger.info(f"Contact message created: {result.inserted_id}")
            return message
        except Exception as e:
            logger.error(f"Error creating contact message: {e}")
            raise

    async def get_contact_messages(self, skip: int = 0, limit: int = 50) -> List[ContactMessage]:
        try:
            cursor = self.db.contact_messages.find().sort("timestamp", -1).skip(skip).limit(limit)
            messages = await cursor.to_list(length=limit)
            return [ContactMessage(**msg) for msg in messages]
        except Exception as e:
            logger.error(f"Error fetching contact messages: {e}")
            raise
    
    async def update_contact_message(self, msg_id: str, update_data: ContactMessageUpdate) -> bool:
        try:
            result = await self.db.contact_messages.update_one(
                {"id": msg_id}, 
                {"$set": update_data.dict()}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating contact message: {e}")
            raise

    # Analytics Management
    async def create_analytics_event(self, event: AnalyticsEvent) -> AnalyticsEvent:
        try:
            await self.db.analytics_events.insert_one(event.dict())
            return event
        except Exception as e:
            logger.error(f"Error creating analytics event: {e}")
            raise

    async def get_analytics_stats(self, days: int = 30) -> AnalyticsStats:
        try:
            cutoff_date = datetime.utcnow() - timedelta(days=days)
            
            # Total views
            total_views = await self.db.analytics_events.count_documents({
                "event_type": {"$in": ["page_view", "section_view"]},
                "timestamp": {"$gte": cutoff_date}
            })
            
            # Section views aggregation
            pipeline = [
                {"$match": {
                    "event_type": "section_view",
                    "timestamp": {"$gte": cutoff_date}
                }},
                {"$group": {
                    "_id": "$section",
                    "count": {"$sum": 1}
                }}
            ]
            section_agg = await self.db.analytics_events.aggregate(pipeline).to_list(None)
            section_views = {item["_id"]: item["count"] for item in section_agg}
            
            # Recent activity
            recent_events = await self.db.analytics_events.find(
                {"timestamp": {"$gte": cutoff_date}}
            ).sort("timestamp", -1).limit(10).to_list(10)
            
            recent_activity = [{
                "event_type": event["event_type"],
                "section": event.get("section"),
                "timestamp": event["timestamp"]
            } for event in recent_events]
            
            # Contact submissions
            contact_count = await self.db.contact_messages.count_documents({
                "timestamp": {"$gte": cutoff_date}
            })
            
            # Downloads
            download_count = await self.db.analytics_events.count_documents({
                "event_type": "download",
                "timestamp": {"$gte": cutoff_date}
            })
            
            return AnalyticsStats(
                total_views=total_views,
                section_views=section_views,
                recent_activity=recent_activity,
                contact_submissions=contact_count,
                downloads=download_count
            )
        except Exception as e:
            logger.error(f"Error getting analytics stats: {e}")
            raise

    # Portfolio Data Management
    async def get_portfolio_data(self) -> Optional[PortfolioData]:
        try:
            data = await self.db.portfolio_data.find_one()
            if data:
                # Remove MongoDB _id field
                data.pop('_id', None)
                return PortfolioData(**data)
            return None
        except Exception as e:
            logger.error(f"Error fetching portfolio data: {e}")
            raise

    async def update_portfolio_data(self, portfolio_data: PortfolioData) -> bool:
        try:
            result = await self.db.portfolio_data.replace_one(
                {}, 
                portfolio_data.dict(),
                upsert=True
            )
            return True
        except Exception as e:
            logger.error(f"Error updating portfolio data: {e}")
            raise

    # Admin Management
    async def get_admin_user(self, username: str) -> Optional[AdminUser]:
        try:
            user_data = await self.db.admin_users.find_one({"username": username})
            if user_data:
                user_data.pop('_id', None)
                return AdminUser(**user_data)
            return None
        except Exception as e:
            logger.error(f"Error fetching admin user: {e}")
            raise

    async def update_admin_last_login(self, username: str) -> bool:
        try:
            result = await self.db.admin_users.update_one(
                {"username": username},
                {"$set": {"last_login": datetime.utcnow()}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating admin last login: {e}")
            raise