using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bucketlist.Migrations
{
    /// <inheritdoc />
    public partial class ToSnakeCase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoItems_TodoLists_TodoListId",
                table: "TodoItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TodoLists",
                table: "TodoLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TodoItems",
                table: "TodoItems");

            migrationBuilder.RenameTable(
                name: "TodoLists",
                newName: "todo_lists");

            migrationBuilder.RenameTable(
                name: "TodoItems",
                newName: "todo_items");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "todo_lists",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "todo_lists",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "todo_items",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "todo_items",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Deadline",
                table: "todo_items",
                newName: "deadline");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "todo_items",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "todo_items",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "TodoListId",
                table: "todo_items",
                newName: "todo_list_id");

            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "todo_items",
                newName: "is_complete");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "todo_items",
                newName: "created_at");

            migrationBuilder.RenameIndex(
                name: "IX_TodoItems_TodoListId",
                table: "todo_items",
                newName: "ix_todo_items_todo_list_id");

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "todo_lists",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "todo_lists",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "pk_todo_lists",
                table: "todo_lists",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_todo_items",
                table: "todo_items",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_todo_items_todo_lists_todo_list_id",
                table: "todo_items",
                column: "todo_list_id",
                principalTable: "todo_lists",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_todo_items_todo_lists_todo_list_id",
                table: "todo_items");

            migrationBuilder.DropPrimaryKey(
                name: "pk_todo_lists",
                table: "todo_lists");

            migrationBuilder.DropPrimaryKey(
                name: "pk_todo_items",
                table: "todo_items");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "todo_lists");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "todo_lists");

            migrationBuilder.RenameTable(
                name: "todo_lists",
                newName: "TodoLists");

            migrationBuilder.RenameTable(
                name: "todo_items",
                newName: "TodoItems");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "TodoLists",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TodoLists",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "TodoItems",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "TodoItems",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "deadline",
                table: "TodoItems",
                newName: "Deadline");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "TodoItems",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "TodoItems",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "todo_list_id",
                table: "TodoItems",
                newName: "TodoListId");

            migrationBuilder.RenameColumn(
                name: "is_complete",
                table: "TodoItems",
                newName: "IsComplete");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "TodoItems",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "ix_todo_items_todo_list_id",
                table: "TodoItems",
                newName: "IX_TodoItems_TodoListId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TodoLists",
                table: "TodoLists",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TodoItems",
                table: "TodoItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoItems_TodoLists_TodoListId",
                table: "TodoItems",
                column: "TodoListId",
                principalTable: "TodoLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
