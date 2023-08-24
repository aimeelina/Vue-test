const knowledgeGraph={
    "root":{
        "data": {
            "text": "Ch 2 python basics"
        },
        "children": [
            {
                "data": {
                    "text": "Structured Program"
                },
                "children": [
                    {
                        "data": {
                            "text": "concept",
                            "isExplainNode":true
                        },
                        "children":[]
                    },
                    {
                        "data": {
                            "text": "function"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "define"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": " def / return"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "function name"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "args"
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "call"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "interface"
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "input / return"
                                                },
                                                "children":[]
                                            }
                                        ]
                                    },{
                                        "data": {
                                            "text": "pass data into a function"
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "Required argument"
                                                },
                                                "children": [
                                                    {
                                                        "data": {
                                                            "text": "direct pass"
                                                        },
                                                        "children": []
                                                    },{
                                                        "data": {
                                                            "text": "by reference"
                                                        },
                                                        "children": []
                                                    }
                                                ]
                                            },{
                                                "data": {
                                                    "text": "Keyword argument"
                                                },
                                                "children": [
                                                    {
                                                        "data": {
                                                            "text": "keyword : value"
                                                        },
                                                        "children": []
                                                    }
                                                ]
                                            },{
                                                "data": {
                                                    "text": "Recursion"
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "Variable Scope"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "local scope"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "global scope"
                                        },
                                        "children": []
                                    }
                                ]
                            },{
                                "data": {
                                    "text": "lambda"
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "module"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "define"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "pyfile"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "content"
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "function / class / variable"
                                                },
                                                "children": []
                                            },{
                                                "data": {
                                                    "text": "runnable code"
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "import"
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "function"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "variable"
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "runnable code"
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "__main__",
                                                    "isExplainNode":true
                                                },
                                                "children": []
                                            }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
const chapterId=2
const courseId=4

export default {knowledgeGraph,courseId,chapterId};