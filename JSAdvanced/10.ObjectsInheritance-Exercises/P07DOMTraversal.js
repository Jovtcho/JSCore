function highlightInnerMost(selector) {
    let allWithoutChild = $(`${selector} *:not(:has(*))`);
    let maxDepth = 0;
    let deepest;

    allWithoutChild.each(function (index, element) {
        let currentDepth = 0;
        let currentElement = element;
        while (element) {
            currentDepth++;
            element = $(element).parent()[0];
        }

        if (currentDepth > maxDepth) {
            maxDepth = currentDepth;
            deepest = currentElement;
        }
    });

    let selectedElement = $(selector)[0];
    while (deepest && deepest !== selectedElement) {
        $(deepest).addClass('highlight');
        deepest = $(deepest).parent()[0];
    }

    $(selector).addClass('highlight');
}


function solve(selector) {
    let firstNode = $(selector);
    let deepest = 0;
    let deepestNode = firstNode;

    dfs(0, firstNode);
    highlightAllNodes(deepestNode);

    function dfs(currentDepth, currentNode) {
        if(currentDepth > deepest){
            deepest = currentDepth;
            deepestNode = currentNode;
        }

        let children = currentNode.children();
        for(let child of children) {
            dfs(currentDepth + 1, $(child))
        }
    }

    function highlightAllNodes(currentNode) {
        currentNode.addClass('highlight');
        if(currentNode.attr('id') === firstNode.attr('id')){
            return;
        }

        highlightAllNodes(currentNode.parent())
    }
}