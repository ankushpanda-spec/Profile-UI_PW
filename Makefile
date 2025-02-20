build-project:
	npm install -g pnpm@8.14.0
	pnpm -v
	node -v
	pnpm install
	pnpm lint
	pnpm build