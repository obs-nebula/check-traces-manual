# check-traces-manual

Same as https://github.com/obs-nebula/check-traces, but manual.

> OTEL-JS packages in use:

| Package | Why |
| ----------- | ----------- |
| @opentelemetry/exporter-trace-otlp-http | To export to Jaeger via OTLP/HTTP |
| @opentelemetry/resources | To be used with `semantic-conventions` to identify the application/service's name |
| @opentelemetry/sdk-trace-base | For manual instrumentation  |
| @opentelemetry/semantic-conventions | To be used with `resources` to identify the application/service's name |
| @opentelemetry/api | To get the trace instance and control spans creation |


```
./scripts/start.sh
npm install
npm start
```

[http://localhost:8080/](http://localhost:8080)

[http://localhost:16686/](http://localhost:16686)