# check-traces-manual

Same as https://github.com/obs-nebula/check-traces, but using manual instrumentation.

> OTEL-JS packages in use:

| Package | |
| ----------- | ----------- |
| @opentelemetry/exporter-trace-otlp-http | To export to OTELCOL via OTLP/HTTP |
| @opentelemetry/resources | To be used with `semantic-conventions` to identify the application/service's name |
| @opentelemetry/sdk-trace-base | For manual instrumentation  |
| @opentelemetry/semantic-conventions | To be used with `resources` to identify the application/service's name |
| @opentelemetry/api | To get the trace instance and control spans creation |

## How to run

```shell
# This will download and start OTELCOL
./scripts/start.sh

# Start the example
npm install
npm start
```
### Test

```shell
# Create some spans
curl -v http://localhost:8080
# Check the results
curl -s http://localhost:8888/metrics
```
### Stop the application and OTELCOL

```shell
killall node
./scripts/stop.sh
```
