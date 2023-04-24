make-migrations: 
	docker compose up -d db && \
	DATABASE_HOST=0.0.0.0 npx prisma migrate dev && \
	docker compose down -v
