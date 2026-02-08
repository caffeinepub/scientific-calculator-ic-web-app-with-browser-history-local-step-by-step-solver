import type { Token } from './tokenize';

export type ASTNode =
  | { type: 'NUMBER'; value: number }
  | { type: 'CONSTANT'; value: string }
  | { type: 'BINARY_OP'; operator: string; left: ASTNode; right: ASTNode }
  | { type: 'UNARY_OP'; operator: string; operand: ASTNode }
  | { type: 'FUNCTION'; name: string; argument: ASTNode };

export function parse(tokens: Token[]): ASTNode {
  let position = 0;

  function peek(): Token | null {
    return tokens[position] || null;
  }

  function consume(): Token {
    return tokens[position++];
  }

  function parseExpression(): ASTNode {
    return parseAdditive();
  }

  function parseAdditive(): ASTNode {
    let left = parseMultiplicative();

    while (peek()?.type === 'OPERATOR' && ['+', '-'].includes(peek()!.value)) {
      const operator = consume().value;
      const right = parseMultiplicative();
      left = { type: 'BINARY_OP', operator, left, right };
    }

    return left;
  }

  function parseMultiplicative(): ASTNode {
    let left = parseExponential();

    while (peek()?.type === 'OPERATOR' && ['*', '/'].includes(peek()!.value)) {
      const operator = consume().value;
      const right = parseExponential();
      left = { type: 'BINARY_OP', operator, left, right };
    }

    return left;
  }

  function parseExponential(): ASTNode {
    let left = parseUnary();

    while (peek()?.type === 'OPERATOR' && peek()!.value === '^') {
      consume(); // consume '^'
      const right = parseUnary();
      left = { type: 'BINARY_OP', operator: '^', left, right };
    }

    return left;
  }

  function parseUnary(): ASTNode {
    const token = peek();

    if (token?.type === 'OPERATOR' && token.value === '-') {
      consume();
      const operand = parseUnary();
      return { type: 'UNARY_OP', operator: '-', operand };
    }

    return parsePostfix();
  }

  function parsePostfix(): ASTNode {
    let node = parsePrimary();

    while (peek()?.type === 'OPERATOR' && peek()!.value === '!') {
      consume();
      node = { type: 'UNARY_OP', operator: '!', operand: node };
    }

    return node;
  }

  function parsePrimary(): ASTNode {
    const token = peek();

    if (!token) {
      throw new Error('Unexpected end of expression');
    }

    if (token.type === 'NUMBER') {
      consume();
      return { type: 'NUMBER', value: parseFloat(token.value) };
    }

    if (token.type === 'CONSTANT') {
      consume();
      return { type: 'CONSTANT', value: token.value };
    }

    if (token.type === 'FUNCTION') {
      const func = consume();
      const argument = parsePrimary();
      return { type: 'FUNCTION', name: func.value, argument };
    }

    if (token.type === 'LPAREN') {
      consume();
      const expr = parseExpression();
      if (peek()?.type !== 'RPAREN') {
        throw new Error('Missing closing parenthesis');
      }
      consume();
      return expr;
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  const ast = parseExpression();

  if (position < tokens.length) {
    throw new Error(`Unexpected token: ${tokens[position].value}`);
  }

  return ast;
}
