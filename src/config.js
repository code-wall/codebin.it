/**
 * The query param in the URL that defines contains
 * the snippet ID
 * @type {string}
 */
export const SNIPPET_QUERY_PARAM = "s";

/**
 * The language the editor is defaulted to on a new
 * editor when nothing is selected;
 * @type {string}
 */
export const DEFAULT_LANG =  "javascript";

/**
 * The default content of the editor if we are creating
 * a new editor
 * @type {string}
 */
export const DEFAULT_CONTENT = "// Enter your code here :)";

/**
 * String to display when we cant find users requested snippet
 * @type {string}
 */
export const SNIPPET_NOT_FOUND = "\n/**\n * Sorry We can't find the snipped you are looking for\n * Why not create a new one :) \n */";

/**
 * The status the server returns when request is succdessful
 * @type {string}
 */
export const RESPONSE_SUCCESS_STATUS = "ok";

/**
 * The status the server returns when request is unsuccessful
 * @type {string}
 */
export const RESPONSE_ERROR_STATUS = "error";

/**
 * Map and Source of our supported versions
 * @type {Map}
 */
export const SUPPORTED_LANGS = new Map([
    ["apl", {
        name:"apl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/apl/apl.min.js"
    }],
    ["asciiarmor", {
        name:"asciiarmor",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/asciiarmor/asciiarmor.min.js"
    }],
    ["asn.1", {
        name:"asn.1",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/asn.1/asn.1.min.js"
    }],
    ["asterisk", {
        name:"asterisk",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/asterisk/asterisk.min.js"
    }],
    ["brainfuck", {
        name:"brainfuck",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/brainfuck/brainfuck.min.js"
    }],
    ["clike", {
        name:"clike",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/clike/clike.min.js"
    }],
    ["clojure", {
        name:"clojure",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/clojure/clojure.min.js"
    }],
    ["cmake", {
        name:"cmake",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/cmake/cmake.min.js"
    }],
    ["cobol", {
        name:"cobol",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/cobol/cobol.min.js"
    }],
    ["coffeescript", {
        name:"coffeescript",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/coffeescript/coffeescript.min.js"
    }],
    ["commonlisp", {
        name:"commonlisp",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/commonlisp/commonlisp.min.js"
    }],
    ["css", {
        name:"css",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/css/css.min.js"
    }],
    ["cypher", {
        name:"cypher",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/cypher/cypher.min.js"
    }],
    ["d", {
        name:"d",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/d/d.min.js"
    }],
    ["dart", {
        name:"dart",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/dart/dart.min.js"
    }],
    ["diff", {
        name:"diff",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/diff/diff.min.js"
    }],
    ["django", {
        name:"django",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/django/django.min.js"
    }],
    ["dockerfile", {
        name:"dockerfile",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/dockerfile/dockerfile.min.js"
    }],
    ["dtd", {
        name:"dtd",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/dtd/dtd.min.js"
    }],
    ["dylan", {
        name:"dylan",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/dylan/dylan.min.js"
    }],
    ["ebnf", {
        name:"ebnf",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ebnf/ebnf.min.js"
    }],
    ["ecl", {
        name:"ecl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ecl/ecl.min.js"
    }],
    ["eiffel", {
        name:"eiffel",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/eiffel/eiffel.min.js"
    }],
    ["elm", {
        name:"elm",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/elm/elm.min.js"
    }],
    ["erlang", {
        name:"erlang",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/erlang/erlang.min.js"
    }],
    ["factor", {
        name:"factor",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/factor/factor.min.js"
    }],
    ["forth", {
        name:"forth",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/forth/forth.min.js"
    }],
    ["fortran", {
        name:"fortran",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/fortran/fortran.min.js"
    }],
    ["gas", {
        name:"gas",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/gas/gas.min.js"
    }],
    ["gfm", {
        name:"gfm",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/gfm/gfm.min.js"
    }],
    ["gherkin", {
        name:"gherkin",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/gherkin/gherkin.min.js"
    }],
    ["go", {
        name:"go",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/go/go.min.js"
    }],
    ["groovy", {
        name:"groovy",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/groovy/groovy.min.js"
    }],
    ["haml", {
        name:"haml",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/haml/haml.min.js"
    }],
    ["handlebars", {
        name:"handlebars",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/handlebars/handlebars.min.js"
    }],
    ["haskell", {
        name:"haskell",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/haskell/haskell.min.js"
    }],
    ["haxe", {
        name:"haxe",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/haxe/haxe.min.js"
    }],
    ["htmlembedded", {
        name:"htmlembedded",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/htmlembedded/htmlembedded.min.js"
    }],
    ["htmlmixed", {
        name:"htmlmixed",
        dependencies:["css", "xml", "javascript"],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/htmlmixed/htmlmixed.min.js"
    }],
    ["http", {
        name:"http",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/http/http.min.js"
    }],
    ["idl", {
        name:"idl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/idl/idl.min.js"
    }],
    ["jade", {
        name:"jade",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/jade/jade.min.js"
    }],
    ["javascript", {
        name:"javascript",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/javascript/javascript.min.js"
    }],
    ["jinja2", {
        name:"jinja2",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/jinja2/jinja2.min.js"
    }],
    ["julia", {
        name:"julia",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/julia/julia.min.js"
    }],
    ["livescript", {
        name:"livescript",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/livescript/livescript.min.js"
    }],
    ["lua", {
        name:"lua",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/lua/lua.min.js"
    }],
    ["markdown", {
        name:"markdown",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/markdown/markdown.min.js"
    }],
    ["mathematica", {
        name:"mathematica",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/mathematica/mathematica.min.js"
    }],
    ["meta.js", {
        name:"meta.js",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/meta.js/meta.js.min.js"
    }],
    ["mirc", {
        name:"mirc",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/mirc/mirc.min.js"
    }],
    ["mllike", {
        name:"mllike",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/mllike/mllike.min.js"
    }],
    ["modelica", {
        name:"modelica",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/modelica/modelica.min.js"
    }],
    ["mscgen", {
        name:"mscgen",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/mscgen/mscgen.min.js"
    }],
    ["mumps", {
        name:"mumps",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/mumps/mumps.min.js"
    }],
    ["nginx", {
        name:"nginx",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/nginx/nginx.min.js"
    }],
    ["nsis", {
        name:"nsis",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/nsis/nsis.min.js"
    }],
    ["ntriples", {
        name:"ntriples",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ntriples/ntriples.min.js"
    }],
    ["octave", {
        name:"octave",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/octave/octave.min.js"
    }],
    ["oz", {
        name:"oz",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/oz/oz.min.js"
    }],
    ["pascal", {
        name:"pascal",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/pascal/pascal.min.js"
    }],
    ["pegjs", {
        name:"pegjs",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/pegjs/pegjs.min.js"
    }],
    ["perl", {
        name:"perl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/perl/perl.min.js"
    }],
    ["php", {
        name:"php",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/php/php.min.js"
    }],
    ["pig", {
        name:"pig",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/pig/pig.min.js"
    }],
    ["properties", {
        name:"properties",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/properties/properties.min.js"
    }],
    ["puppet", {
        name:"puppet",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/puppet/puppet.min.js"
    }],
    ["python", {
        name:"python",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/python/python.min.js"
    }],
    ["q", {
        name:"q",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/q/q.min.js"
    }],
    ["r", {
        name:"r",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/r/r.min.js"
    }],
    ["rpm", {
        name:"rpm",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/rpm/rpm.min.js"
    }],
    ["rst", {
        name:"rst",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/rst/rst.min.js"
    }],
    ["ruby", {
        name:"ruby",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ruby/ruby.min.js"
    }],
    ["rust", {
        name:"rust",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/rust/rust.min.js"
    }],
    ["sass", {
        name:"sass",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/sass/sass.min.js"
    }],
    ["scheme", {
        name:"scheme",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/scheme/scheme.min.js"
    }],
    ["shell", {
        name:"shell",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/shell/shell.min.js"
    }],
    ["sieve", {
        name:"sieve",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/sieve/sieve.min.js"
    }],
    ["slim", {
        name:"slim",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/slim/slim.min.js"
    }],
    ["smalltalk", {
        name:"smalltalk",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/smalltalk/smalltalk.min.js"
    }],
    ["smarty", {
        name:"smarty",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/smarty/smarty.min.js"
    }],
    ["solr", {
        name:"solr",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/solr/solr.min.js"
    }],
    ["soy", {
        name:"soy",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/soy/soy.min.js"
    }],
    ["sparql", {
        name:"sparql",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/sparql/sparql.min.js"
    }],
    ["spreadsheet", {
        name:"spreadsheet",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/spreadsheet/spreadsheet.min.js"
    }],
    ["sql", {
        name:"sql",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/sql/sql.min.js"
    }],
    ["stex", {
        name:"stex",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/stex/stex.min.js"
    }],
    ["stylus", {
        name:"stylus",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/stylus/stylus.min.js"
    }],
    ["swift", {
        name:"swift",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/swift/swift.min.js"
    }],
    ["tcl", {
        name:"tcl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/tcl/tcl.min.js"
    }],
    ["textile", {
        name:"textile",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/textile/textile.min.js"
    }],
    ["tiddlywiki", {
        name:"tiddlywiki",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/tiddlywiki/tiddlywiki.min.js"
    }],
    ["tiki", {
        name:"tiki",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/tiki/tiki.min.js"
    }],
    ["toml", {
        name:"toml",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/toml/toml.min.js"
    }],
    ["tornado", {
        name:"tornado",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/tornado/tornado.min.js"
    }],
    ["troff", {
        name:"troff",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/troff/troff.min.js"
    }],
    ["ttcn", {
        name:"ttcn",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ttcn/ttcn.min.js"
    }],
    ["ttcn-cfg", {
        name:"ttcn-cfg",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/ttcn-cfg/ttcn-cfg.min.js"
    }],
    ["turtle", {
        name:"turtle",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/turtle/turtle.min.js"
    }],
    ["twig", {
        name:"twig",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/twig/twig.min.js"
    }],
    ["vb", {
        name:"vb",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/vb/vb.min.js"
    }],
    ["vbscript", {
        name:"vbscript",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/vbscript/vbscript.min.js"
    }],
    ["velocity", {
        name:"velocity",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/velocity/velocity.min.js"
    }],
    ["verilog", {
        name:"verilog",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/verilog/verilog.min.js"
    }],
    ["vhdl", {
        name:"vhdl",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/vhdl/vhdl.min.js"
    }],
    ["vue", {
        name:"vue",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/vue/vue.min.js"
    }],
    ["xml", {
        name:"xml",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/xml/xml.min.js"
    }],
    ["xquery", {
        name:"xquery",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/xquery/xquery.min.js"
    }],
    ["yaml", {
        name:"yaml",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/yaml/yaml.min.js"
    }],
    ["z80", {
        name:"yaml",
        dependencies:[],
        src:"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/yaml/yaml.min.js"
    }]
]);
