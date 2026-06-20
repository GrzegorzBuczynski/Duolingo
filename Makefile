# Makefile dla learning-app
# Użycie: make <cel>    (domyślnie: help)

COMPOSE_FILE := learning-app/infra/docker-compose.yml
COMPOSE      := docker compose --file $(COMPOSE_FILE)

.DEFAULT_GOAL := help

.PHONY: help up down build rebuild restart logs ps clean fclean

help: ## Pokaż listę dostępnych komend
	@echo "Dostępne cele:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## Uruchom kontenery w tle
	$(COMPOSE) up -d

down: ## Zatrzymaj i usuń kontenery
	$(COMPOSE) down

build: ## Zbuduj obrazy
	$(COMPOSE) build

rebuild: ## Zbuduj obrazy od zera (bez cache) i uruchom
	$(COMPOSE) build --no-cache
	$(COMPOSE) up -d

restart: ## Zrestartuj kontenery
	$(COMPOSE) restart

logs: ## Podgląd logów na żywo (Ctrl+C aby wyjść)
	$(COMPOSE) logs -f

ps: ## Pokaż status kontenerów
	$(COMPOSE) ps

clean: ## Zatrzymaj kontenery i usuń osierocone zasoby
	$(COMPOSE) down --remove-orphans

fclean: ## Pełne czyszczenie: kontenery, sieci, wolumeny, obrazy
	$(COMPOSE) down --volumes --rmi all --remove-orphans

dev-build:
	docker compose -f learning-app/infra/docker-compose.dev.yml build

dev-up:
	docker compose -f learning-app/infra/docker-compose.dev.yml up

dev:
	docker compose -f learning-app/infra/docker-compose.dev.yml up --build

dev-down:
	docker compose -f learning-app/infra/docker-compose.dev.yml down