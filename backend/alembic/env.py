from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import settings # Import the settings module

# Load DATABASE_URL from settings.py
DATABASE_URL = settings.DATABASE_URL

# Alembic Config object (accesses the .ini file)
config = context.config

# Set the database URL dynamically in the Alembic config
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Set up logging
if config.config_file_name:
    fileConfig(config.config_file_name)

# Import your database models
from database.connection import Base  # Import Base metadata
from users.models import User  # Example import (Add other models)
from properties.models import Property
from bookmarks.models import Bookmark
from comments.models import Comment

# Set target metadata for autogeneration
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


# Determine if Alembic should run in online or offline mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
