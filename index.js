const opentelemetry = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const express = require('express');

const exporter = new JaegerExporter();

const provider = new BasicTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.npm_package_name,
  }),
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

const tracer = opentelemetry.trace.getTracer(process.env.npm_package_name);

const app = express();
const port = 8080;

const parentSpan = tracer.startSpan('main');

app.get('/', (_, res) => {
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan);
  const span = tracer.startSpan('GET /', undefined, ctx);
  span.addEvent('invoking GET/');
  res.send('Hello World!');
  span.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function shutDown() {
  parentSpan.end();
  exporter.shutdown();
  server.close(() => process.exit(0));
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
