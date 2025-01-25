from supabase import create_client
import settings

# Initialize Supabase client
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

try:
    # Create a bucket with options
    response = supabase.storage.create_bucket(
        'property_images',
        options={
            "public": True,
            "allowed_mime_types": settings.ALLOWED_MIME_TYPES,
            "file_size_limit": 10485760
        }
    )
    print("Response:", response)

    # Check if response has an error key
    if isinstance(response, dict) and response.get('error'):
        print("Error:", response['error']['message'])
    else:
        print("Bucket created successfully:", response)

except Exception as e:
    print("An error occurred:", str(e))
