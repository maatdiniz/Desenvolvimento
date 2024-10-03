from collections import deque

# Função para verificar se um estado já foi visitado
def estado_visitado(estado, visitados):
    return estado in visitados

# Função para gerar todos os estados possíveis a partir de um estado dado
def gerar_estados(estado):
    x, y = estado  # x = litros no jarro de 4 litros, y = litros no jarro de 3 litros
    estados_possiveis = []

    # Encher o jarro de 4 litros
    if x < 4:
        estados_possiveis.append((4, y))
    # Encher o jarro de 3 litros
    if y < 3:
        estados_possiveis.append((x, 3))
    # Esvaziar o jarro de 4 litros
    if x > 0:
        estados_possiveis.append((0, y))
    # Esvaziar o jarro de 3 litros
    if y > 0:
        estados_possiveis.append((x, 0))
    # Despejar do jarro de 4 litros para o de 3 litros
    if x > 0 and y < 3:
        transfer = min(x, 3 - y)
        estados_possiveis.append((x - transfer, y + transfer))
    # Despejar do jarro de 3 litros para o de 4 litros
    if y > 0 and x < 4:
        transfer = min(y, 4 - x)
        estados_possiveis.append((x + transfer, y - transfer))

    return estados_possiveis

# Função BFS para encontrar a solução
def bfs():
    estado_inicial = (0, 0)
    estado_objetivo = 2
    visitados = set()
    fila = deque([(estado_inicial, [])])  # Armazena o estado atual e o caminho percorrido até ele

    while fila:
        estado_atual, caminho = fila.popleft()

        # Se já atingimos o objetivo, retornamos o caminho
        if estado_atual[0] == estado_objetivo:
            return caminho + [estado_atual]

        # Marca o estado como visitado
        if estado_atual not in visitados:
            visitados.add(estado_atual)

            # Gera os próximos estados possíveis
            for proximo_estado in gerar_estados(estado_atual):
                if not estado_visitado(proximo_estado, visitados):
                    fila.append((proximo_estado, caminho + [estado_atual]))

    return None

# Função principal para rodar o algoritmo
solucao = bfs()

if solucao:
    print("Caminho para a solução:")
    for estado in solucao:
        print(estado)
else:
    print("Nenhuma solução encontrada.")