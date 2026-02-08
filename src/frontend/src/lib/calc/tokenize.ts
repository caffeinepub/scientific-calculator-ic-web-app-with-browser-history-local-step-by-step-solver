export type TokenType =
  | 'NUMBER'
  | 'OPERATOR'
  | 'FUNCTION'
  | 'LPAREN'
  | 'RPAREN'
  | 'CONSTANT';

export interface Token {
  type: TokenType;
  value: string;
}

export function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  // Normalize expression
  expr = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/√/g, 'sqrt')
    .replace(/x²/g, '^2')
    .replace(/x\^y/g, '^')
    .replace(/±/g, 'neg');

  while (i < expr.length) {
    const char = expr[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Numbers (including decimals)
    if (/\d/.test(char) || (char === '.' && /\d/.test(expr[i + 1] || ''))) {
      let num = '';
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
        num += expr[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    // Functions
    if (/[a-z]/i.test(char)) {
      let func = '';
      while (i < expr.length && /[a-z]/i.test(expr[i])) {
        func += expr[i];
        i++;
      }
      
      if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'neg'].includes(func)) {
        tokens.push({ type: 'FUNCTION', value: func });
      } else if (func === 'π' || func === 'pi') {
        tokens.push({ type: 'CONSTANT', value: 'π' });
      } else if (func === 'e') {
        tokens.push({ type: 'CONSTANT', value: 'e' });
      } else {
        throw new Error(`Unknown function: ${func}`);
      }
      continue;
    }

    // Constants
    if (char === 'π') {
      tokens.push({ type: 'CONSTANT', value: 'π' });
      i++;
      continue;
    }

    if (char === 'e' && (i === 0 || !/\d/.test(expr[i - 1]))) {
      tokens.push({ type: 'CONSTANT', value: 'e' });
      i++;
      continue;
    }

    // Operators
    if (['+', '-', '*', '/', '^', '!'].includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      i++;
      continue;
    }

    // Parentheses
    if (char === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }

    if (char === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}
