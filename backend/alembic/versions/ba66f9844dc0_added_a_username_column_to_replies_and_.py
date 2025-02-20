"""added a username column to replies and comments

Revision ID: ba66f9844dc0
Revises: 53f974c155c1
Create Date: 2025-02-21 00:21:40.983934

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ba66f9844dc0'
down_revision: Union[str, None] = '53f974c155c1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'bookmarks', ['id'])
    op.add_column('comments', sa.Column('username', sa.String(length=256), nullable=True))
    op.create_unique_constraint(None, 'comments', ['id'])
    op.create_unique_constraint(None, 'properties', ['id'])
    op.create_unique_constraint(None, 'property_images', ['id'])
    op.add_column('replies', sa.Column('username', sa.String(length=256), nullable=True))
    op.create_unique_constraint(None, 'replies', ['id'])
    op.create_unique_constraint(None, 'users', ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_constraint(None, 'replies', type_='unique')
    op.drop_column('replies', 'username')
    op.drop_constraint(None, 'property_images', type_='unique')
    op.drop_constraint(None, 'properties', type_='unique')
    op.drop_constraint(None, 'comments', type_='unique')
    op.drop_column('comments', 'username')
    op.drop_constraint(None, 'bookmarks', type_='unique')
    # ### end Alembic commands ###
