FROM jboss/keycloak:8.0.1

#ENV DB_VENDOR POSTGRES

COPY keycloak-settings/realm-produtcs.json .

CMD ["-b", "0.0.0.0", "-bmanagement", "0.0.0.0", "-Dkeycloak.import=realm-produtcs.json"]
