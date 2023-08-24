const knowledgeGraph={
    "root":{
        "data": {
            "text": "Ch 1 python basics",
        },
        "children": [
            {
                "data": {
                    "text": "control flow"
                },
                "children": [
                    {
                        "data": {
                            "text": "branch"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "if",
                                    "ableToClick": true,
                                    "testID": 1,
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "condition",
                                            "isExplainNode": true
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "Boolean condition",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            },{
                                                "data": {
                                                    "text": "expression",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            }
                                        ]
                                    },{
                                        "data": {
                                            "text": "statements",
                                            "isExplainNode": true
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "if .. else ..",
                                    "ableToClick": true,
                                        "testID": 2,
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "if .. elif .. else ..",
                                    "ableToClick": true,
                                        "testID": 3,
                                },
                                "children": []
                            },{
                                "data": {
                                    "text": "nested",
                                    "ableToClick": true,
                                        "testID": 4,
                                },
                                "children": []
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "loop"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "while",
                                    "ableToClick": true,
                                        "testID": 5,
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "condition",
                                            "isExplainNode": true
                                        },
                                        "children": []
                                    },
                                    {
                                        "data": {
                                            "text": "statements",
                                            "isExplainNode": true
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "nested",
                                            "isExplainNode": true
                                        },
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "text": "for",
                                    "ableToClick": true,
                                        "testID": 6,
                                },
                                "children": [
                                    {
                                        "data": {
                                            "text": "var/sequence",
                                            "isExplainNode": true
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "list",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            },
                                            {
                                                "data": {
                                                    "text": "tuple",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            },
                                            {
                                                "data": {
                                                    "text": "range()",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            }

                                        ]
                                    }, {
                                        "data": {
                                            "text": "statements",
                                            "isExplainNode": true
                                        },
                                        "children": []
                                    },{
                                        "data": {
                                            "text": "nested",
                                            "isExplainNode": true
                                        },
                                        "children": [
                                            {
                                                "data": {
                                                    "text": "for",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            },{
                                                "data": {
                                                    "text": "if .. else ..",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            },{
                                                "data": {
                                                    "text": "while",
                                                    "isExplainNode": true
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "text": "control flow tools"
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "break",
                                    "ableToClick": true,
                                        "testID": 7,
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "continue",
                                    "ableToClick": true,
                                        "testID": 8,
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "pass",
                                    "ableToClick": true,
                                        "testID": 9,
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            },
            {
                "data": {
                    "text": "program design"
                },
                "children": [
                    {
                        "data": {
                            "text": "algorithms",
                                    "ableToClick": true,
                                        "testID": 10,
                        },
                        "children": [
                            {
                                "data": {
                                    "text": "step 1:flow charts",
                                    "isExplainNode": true
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "step 2:pseudocode",
                                    "isExplainNode": true
                                },
                                "children": []
                            },
                            {
                                "data": {
                                    "text": "step 3:program code",
                                    "isExplainNode": true
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
            
    }
}
const chapterId=1
const courseId=1

export default {knowledgeGraph,courseId,chapterId};