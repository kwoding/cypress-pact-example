# Example Pact commands

## Publish provider
echo "TEST OK" > provider-test-results.md && \
npx pactflow publish-provider-contract cypress/pacts/contact-service-provider.json \
  --provider=contact-service \
  --provider-app-version=1.0.0 \
  --branch=main \
  --content-type=application.json \
  --verification-exit-code=0 \
  --verification-results=provider-test-results.md \
  --verification-results-content-type=application/json \
  --verifier=rest-assured \
  && rm provider-test-results.md

## Publish consumer contracts
npx pact-broker publish cypress/pacts/contact-service-contact-frontend.json --branch main --consumer-app-version 1.0.0

## Invoke can-i-deploy
npx pact-broker can-i-deploy --pacticipant contact-frontend --latest

## Use swagger-mock-validator (local cross contract validation)
npx @pactflow/swagger-mock-validator cypress/pacts/contact-service-provider.json cypress/pacts/contact-service-contact-frontend.json
