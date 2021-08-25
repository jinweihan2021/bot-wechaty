# tarot
pbjs -t static-module -w commonjs -o examples/models/tarot.js examples/schema/tarot.proto
pbts -o examples/models/tarot.d.ts examples/models/tarot.js
