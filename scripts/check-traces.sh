#!/usr/bin/env bash

#: Description : Basic test to verify if the OTELCOL received the generated spans.

# Retrieve the number of accepted spans from the metrics endpoint of the OTELCOL.
# The 'curl' command fetches the metrics page silently (-s) from http://localhost:8888/metrics.
# The 'grep' command filters the output to find the line containing `otelcol_receiver_accepted_spans{`.
# The 'cut' command then extracts the second field (the value of the metric) from that line.
# The extracted value is stored in the variable 'N' for further use in the script.
N=$(curl -s http://localhost:8888/metrics | grep "otelcol_receiver_accepted_spans{" | cut -d ' ' -f 2)

# When creating spans via `create-trace.sh` script, it is expected to create 1 span.
# So we need to check if the number of spans are the same.
if [ $N -eq 1 ];
then
  echo "Spans found"
  exit 0
else
  echo "Spans not found"
  exit 1
fi

