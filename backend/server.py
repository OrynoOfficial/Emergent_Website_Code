from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============================================
# MODELS
# ============================================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Team Member Models
class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: Optional[str] = ""
    image: Optional[str] = None
    initials: Optional[str] = None
    color: str = "from-blue-500 to-blue-600"
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None
    order: int = 0
    show_on_home: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    bio: Optional[str] = ""
    image: Optional[str] = None
    initials: Optional[str] = None
    color: str = "from-blue-500 to-blue-600"
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None
    order: int = 0
    show_on_home: bool = True

class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None
    initials: Optional[str] = None
    color: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None
    order: Optional[int] = None
    show_on_home: Optional[bool] = None


# Blog Post Models
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: Optional[str] = ""
    category: str = "General"
    author: str = "Admin"
    status: str = "draft"  # draft, published
    image: Optional[str] = None
    tags: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = ""
    category: str = "General"
    author: str = "Admin"
    status: str = "draft"
    image: Optional[str] = None
    tags: List[str] = []

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    status: Optional[str] = None
    image: Optional[str] = None
    tags: Optional[List[str]] = None


# Site Content Models
class SiteContent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str  # hero, about, footer, etc.
    content: dict
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SiteContentUpdate(BaseModel):
    content: dict


# Media Asset Models
class MediaAsset(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    category: str  # shipping, services, general
    title: Optional[str] = ""
    description: Optional[str] = ""
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MediaAssetCreate(BaseModel):
    url: str
    category: str
    title: Optional[str] = ""
    description: Optional[str] = ""
    order: int = 0
    is_active: bool = True


# Testimonial Models
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    comment: str
    rating: int = 5
    avatar: Optional[str] = None
    service: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    location: str
    comment: str
    rating: int = 5
    avatar: Optional[str] = None
    service: Optional[str] = None
    is_active: bool = True


# ============================================
# HELPER FUNCTIONS
# ============================================

def serialize_datetime(obj):
    """Convert datetime objects to ISO strings for MongoDB"""
    if isinstance(obj, datetime):
        return obj.isoformat()
    return obj

def deserialize_doc(doc):
    """Convert ISO strings back to datetime objects"""
    datetime_fields = ['timestamp', 'created_at', 'updated_at']
    for field in datetime_fields:
        if field in doc and isinstance(doc[field], str):
            doc[field] = datetime.fromisoformat(doc[field])
    return doc


# ============================================
# STATUS ROUTES (existing)
# ============================================

@api_router.get("/")
async def root():
    return {"message": "Oryno API is running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        deserialize_doc(check)
    return status_checks


# ============================================
# TEAM MEMBER ROUTES
# ============================================

@api_router.get("/team", response_model=List[TeamMember])
async def get_team_members():
    """Get all team members, sorted by order"""
    members = await db.team_members.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    for member in members:
        deserialize_doc(member)
    return members

@api_router.get("/team/home", response_model=List[TeamMember])
async def get_home_team_members():
    """Get team members to show on homepage"""
    members = await db.team_members.find({"show_on_home": True}, {"_id": 0}).sort("order", 1).to_list(10)
    for member in members:
        deserialize_doc(member)
    return members

@api_router.get("/team/{member_id}", response_model=TeamMember)
async def get_team_member(member_id: str):
    member = await db.team_members.find_one({"id": member_id}, {"_id": 0})
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return deserialize_doc(member)

@api_router.post("/team", response_model=TeamMember)
async def create_team_member(input: TeamMemberCreate):
    member = TeamMember(**input.model_dump())
    # Generate initials if not provided
    if not member.initials:
        names = member.name.split()
        member.initials = ''.join([n[0].upper() for n in names[:2]])
    
    doc = member.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.team_members.insert_one(doc)
    return member

@api_router.put("/team/{member_id}", response_model=TeamMember)
async def update_team_member(member_id: str, input: TeamMemberUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.team_members.update_one({"id": member_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    member = await db.team_members.find_one({"id": member_id}, {"_id": 0})
    return deserialize_doc(member)

@api_router.delete("/team/{member_id}")
async def delete_team_member(member_id: str):
    result = await db.team_members.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted successfully"}


# ============================================
# BLOG POST ROUTES
# ============================================

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(status: Optional[str] = None):
    """Get all blog posts, optionally filtered by status"""
    query = {}
    if status:
        query["status"] = status
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    for post in posts:
        deserialize_doc(post)
    return posts

@api_router.get("/blog/published", response_model=List[BlogPost])
async def get_published_posts():
    """Get all published blog posts"""
    posts = await db.blog_posts.find({"status": "published"}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for post in posts:
        deserialize_doc(post)
    return posts

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return deserialize_doc(post)

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    post = BlogPost(**input.model_dump())
    # Generate excerpt if not provided
    if not post.excerpt and post.content:
        post.excerpt = post.content[:200] + "..." if len(post.content) > 200 else post.content
    
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, input: BlogPostUpdate):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return deserialize_doc(post)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}


# ============================================
# SITE CONTENT ROUTES
# ============================================

@api_router.get("/content", response_model=List[SiteContent])
async def get_all_content():
    """Get all site content sections"""
    content = await db.site_content.find({}, {"_id": 0}).to_list(100)
    for item in content:
        deserialize_doc(item)
    return content

@api_router.get("/content/{section}", response_model=SiteContent)
async def get_content_section(section: str):
    """Get content for a specific section"""
    content = await db.site_content.find_one({"section": section}, {"_id": 0})
    if not content:
        # Return default content if section doesn't exist
        return SiteContent(section=section, content={})
    return deserialize_doc(content)

@api_router.put("/content/{section}", response_model=SiteContent)
async def update_content_section(section: str, input: SiteContentUpdate):
    """Update or create content for a section"""
    existing = await db.site_content.find_one({"section": section})
    
    if existing:
        update_data = {
            "content": input.content,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.site_content.update_one({"section": section}, {"$set": update_data})
    else:
        content = SiteContent(section=section, content=input.content)
        doc = content.model_dump()
        doc['updated_at'] = doc['updated_at'].isoformat()
        await db.site_content.insert_one(doc)
    
    result = await db.site_content.find_one({"section": section}, {"_id": 0})
    return deserialize_doc(result)


# ============================================
# MEDIA ASSET ROUTES
# ============================================

@api_router.get("/media", response_model=List[MediaAsset])
async def get_media_assets(category: Optional[str] = None):
    """Get all media assets, optionally filtered by category"""
    query = {"is_active": True}
    if category:
        query["category"] = category
    assets = await db.media_assets.find(query, {"_id": 0}).sort("order", 1).to_list(100)
    for asset in assets:
        deserialize_doc(asset)
    return assets

@api_router.post("/media", response_model=MediaAsset)
async def create_media_asset(input: MediaAssetCreate):
    asset = MediaAsset(**input.model_dump())
    doc = asset.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.media_assets.insert_one(doc)
    return asset

@api_router.delete("/media/{asset_id}")
async def delete_media_asset(asset_id: str):
    result = await db.media_assets.delete_one({"id": asset_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Media asset not found")
    return {"message": "Media asset deleted successfully"}


# ============================================
# TESTIMONIAL ROUTES
# ============================================

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all active testimonials"""
    testimonials = await db.testimonials.find({"is_active": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for t in testimonials:
        deserialize_doc(t)
    return testimonials

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    testimonial = Testimonial(**input.model_dump())
    doc = testimonial.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.testimonials.insert_one(doc)
    return testimonial

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}


# ============================================
# SEED DATA ROUTE (for initial setup)
# ============================================

@api_router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    
    # Check if data already exists
    team_count = await db.team_members.count_documents({})
    if team_count > 0:
        return {"message": "Database already seeded"}
    
    # Seed Team Members
    team_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Jean-Pierre Kamga",
            "role": "CEO & Founder",
            "bio": "Visionary leader with 15+ years in tech and logistics.",
            "initials": "JK",
            "color": "from-blue-500 to-blue-600",
            "order": 1,
            "show_on_home": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Marie Nguemo",
            "role": "COO",
            "bio": "Operations expert driving efficiency across all services.",
            "initials": "MN",
            "color": "from-purple-500 to-purple-600",
            "order": 2,
            "show_on_home": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Paul Fotso",
            "role": "CTO",
            "bio": "Tech innovator building the future of African services.",
            "initials": "PF",
            "color": "from-green-500 to-green-600",
            "order": 3,
            "show_on_home": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.team_members.insert_many(team_data)
    
    # Seed Testimonials
    testimonials_data = [
        {
            "id": str(uuid.uuid4()),
            "name": "Jean-Pierre Mbarga",
            "location": "Yaoundé",
            "comment": "Oryno has transformed how I travel for business. The booking process is seamless and the service is always reliable.",
            "rating": 5,
            "service": "Bus Travel",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Marie-Claire Fotso",
            "location": "Douala",
            "comment": "I use Oryno for all my hotel bookings. Great prices and excellent customer service!",
            "rating": 5,
            "service": "Hotel Booking",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Emmanuel Nkeng",
            "location": "Buea",
            "comment": "The package delivery service is fast and reliable. My parcels always arrive on time.",
            "rating": 4,
            "service": "Package Delivery",
            "is_active": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.testimonials.insert_many(testimonials_data)
    
    # Seed Site Content
    content_data = [
        {
            "id": str(uuid.uuid4()),
            "section": "hero",
            "content": {
                "title": "YOUR EVERYDAY SERVICES HUB",
                "subtitle": "At Oryno, we bring you all essential services at your fingertips - from travel and hotel bookings to package shipments, restaurants, event management, and more.",
                "badge": "Premium Service Platform"
            },
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "section": "about",
            "content": {
                "title": "Your Trusted Partner for Everyday Convenience",
                "description": "Founded with a vision to transform how Africans access essential services, Oryno brings together travel, hospitality, logistics, and lifestyle services under one unified platform."
            },
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.site_content.insert_many(content_data)
    
    # Seed Blog Posts
    blog_data = [
        {
            "id": str(uuid.uuid4()),
            "title": "How Oryno is Transforming Travel in Cameroon",
            "content": "Discover how Oryno is revolutionizing the way Cameroonians travel and access services...",
            "excerpt": "Discover how Oryno is revolutionizing travel...",
            "category": "Company News",
            "author": "Jean-Pierre",
            "status": "published",
            "tags": ["travel", "innovation"],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.blog_posts.insert_many(blog_data)
    
    return {"message": "Database seeded successfully", "team_members": len(team_data), "testimonials": len(testimonials_data)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
