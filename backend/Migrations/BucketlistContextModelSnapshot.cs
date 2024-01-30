﻿// <auto-generated />
using System;
using Bucketlist.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Bucketlist.Migrations
{
    [DbContext(typeof(BucketlistContext))]
    partial class BucketlistContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Bucketlist.Models.TodoItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("now()");

                    b.Property<DateTime?>("Deadline")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("deadline");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("boolean")
                        .HasColumnName("is_complete");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.Property<long>("TodoListId")
                        .HasColumnType("bigint")
                        .HasColumnName("todo_list_id");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_todo_items");

                    b.HasIndex("TodoListId")
                        .HasDatabaseName("ix_todo_items_todo_list_id");

                    b.ToTable("todo_items", (string)null);
                });

            modelBuilder.Entity("Bucketlist.Models.TodoList", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at")
                        .HasDefaultValueSql("now()");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("updated_at");

                    b.HasKey("Id")
                        .HasName("pk_todo_lists");

                    b.ToTable("todo_lists", (string)null);
                });

            modelBuilder.Entity("Bucketlist.Models.TodoItem", b =>
                {
                    b.HasOne("Bucketlist.Models.TodoList", "TodoList")
                        .WithMany("TodoItems")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_todo_items_todo_lists_todo_list_id");

                    b.Navigation("TodoList");
                });

            modelBuilder.Entity("Bucketlist.Models.TodoList", b =>
                {
                    b.Navigation("TodoItems");
                });
#pragma warning restore 612, 618
        }
    }
}
