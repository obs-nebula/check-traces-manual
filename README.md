# check-traces-manual

Same as https://github.com/obs-nebula/check-traces, but using manual instrumentation.

> OTEL-JS packages in use:

| Package | |
| ----------- | ----------- |
| @opentelemetry/exporter-trace-otlp-http | To export to Jaeger via OTLP/HTTP |
| @opentelemetry/resources | To be used with `semantic-conventions` to identify the application/service's name |
| @opentelemetry/sdk-trace-base | For manual instrumentation  |
| @opentelemetry/semantic-conventions | To be used with `resources` to identify the application/service's name |
| @opentelemetry/api | To get the trace instance and control spans creation |


Start Jaeger locally

```
./scripts/start.sh
```

Start the application

```
npm install
npm start &
```

Access the application to generate traces
[http://localhost:8080/](http://localhost:8080)

Or copy and paste to generate spans every second

```
watch -n 1 curl -v http://localhost:8080
```

See the results in Jaeger UI

[http://localhost:16686/](http://localhost:16686)

Stop the application and Jaeger

```
killall node
./scripts/stop.sh
```
