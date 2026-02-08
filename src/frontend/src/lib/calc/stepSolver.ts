import type { Token } from './tokenize';
import type { ASTNode } from './parse';

export function generateSteps(
  originalExpr: string,
  tokens: Token[],
  ast: ASTNode,
  result: number
): string[] {
  const steps: string[] = [];

  // Step 1: Original expression
  steps.push(`Original expression: ${originalExpr}`);

  // Step 2: Tokenization summary
  const tokenSummary = tokens
    .map((t) => {
      if (t.type === 'NUMBER') return t.value;
      if (t.type === 'CONSTANT') return t.value;
      if (t.type === 'FUNCTION') return t.value + '()';
      if (t.type === 'OPERATOR') return t.value;
      if (t.type === 'LPAREN') return '(';
      if (t.type === 'RPAREN') return ')';
      return t.value;
    })
    .join(' ');
  steps.push(`Parsed tokens: ${tokenSummary}`);

  // Step 3: AST structure explanation
  steps.push(`Expression structure: ${describeAST(ast)}`);

  // Step 4: Evaluation order
  const evalSteps = generateEvaluationSteps(ast);
  steps.push(...evalSteps);

  // Step 5: Final result
  const resultStr = Number.isInteger(result)
    ? result.toString()
    : result.toFixed(8).replace(/\.?0+$/, '');
  steps.push(`Final result: ${resultStr}`);

  return steps;
}

function describeAST(node: ASTNode): string {
  switch (node.type) {
    case 'NUMBER':
      return node.value.toString();
    case 'CONSTANT':
      return node.value;
    case 'BINARY_OP':
      return `(${describeAST(node.left)} ${node.operator} ${describeAST(node.right)})`;
    case 'UNARY_OP':
      if (node.operator === '!') {
        return `${describeAST(node.operand)}!`;
      }
      return `${node.operator}${describeAST(node.operand)}`;
    case 'FUNCTION':
      return `${node.name}(${describeAST(node.argument)})`;
    default:
      return '?';
  }
}

function generateEvaluationSteps(node: ASTNode, depth = 0): string[] {
  const steps: string[] = [];
  const indent = '  '.repeat(depth);

  switch (node.type) {
    case 'NUMBER':
      steps.push(`${indent}Value: ${node.value}`);
      break;

    case 'CONSTANT':
      const constValue = node.value === 'π' ? Math.PI : Math.E;
      steps.push(`${indent}Constant ${node.value} = ${constValue.toFixed(6)}`);
      break;

    case 'BINARY_OP':
      steps.push(`${indent}Evaluate ${node.operator} operation:`);
      steps.push(...generateEvaluationSteps(node.left, depth + 1));
      steps.push(...generateEvaluationSteps(node.right, depth + 1));
      break;

    case 'UNARY_OP':
      if (node.operator === '!') {
        steps.push(`${indent}Calculate factorial:`);
      } else {
        steps.push(`${indent}Apply unary ${node.operator}:`);
      }
      steps.push(...generateEvaluationSteps(node.operand, depth + 1));
      break;

    case 'FUNCTION':
      steps.push(`${indent}Apply function ${node.name}:`);
      steps.push(...generateEvaluationSteps(node.argument, depth + 1));
      break;
  }

  return steps;
}
