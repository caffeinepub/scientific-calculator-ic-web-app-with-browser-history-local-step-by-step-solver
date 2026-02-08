import type { ASTNode } from './parse';
import { factorial } from './math';

export function evaluate(node: ASTNode): number {
  switch (node.type) {
    case 'NUMBER':
      return node.value;

    case 'CONSTANT':
      if (node.value === 'π') return Math.PI;
      if (node.value === 'e') return Math.E;
      throw new Error(`Unknown constant: ${node.value}`);

    case 'BINARY_OP': {
      const left = evaluate(node.left);
      const right = evaluate(node.right);

      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          if (right === 0) throw new Error('Division by zero');
          return left / right;
        case '^':
          return Math.pow(left, right);
        default:
          throw new Error(`Unknown operator: ${node.operator}`);
      }
    }

    case 'UNARY_OP': {
      const operand = evaluate(node.operand);

      switch (node.operator) {
        case '-':
          return -operand;
        case '!':
          return factorial(operand);
        default:
          throw new Error(`Unknown unary operator: ${node.operator}`);
      }
    }

    case 'FUNCTION': {
      const arg = evaluate(node.argument);

      switch (node.name) {
        case 'sin':
          return Math.sin(arg);
        case 'cos':
          return Math.cos(arg);
        case 'tan':
          return Math.tan(arg);
        case 'sqrt':
          if (arg < 0) throw new Error('Square root of negative number');
          return Math.sqrt(arg);
        case 'log':
          if (arg <= 0) throw new Error('Logarithm of non-positive number');
          return Math.log10(arg);
        case 'ln':
          if (arg <= 0) throw new Error('Natural log of non-positive number');
          return Math.log(arg);
        case 'neg':
          return -arg;
        default:
          throw new Error(`Unknown function: ${node.name}`);
      }
    }

    default:
      throw new Error('Invalid AST node');
  }
}
