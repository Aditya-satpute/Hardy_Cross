def hardy_cross(resistances, initial_discharge, weight, iterations):

    num_loops = len(weight)
    num_pipes = len(initial_discharge)
    discharge = initial_discharge

    for iteration in range(iterations):

        errors = []

        for loop in weight:

            num_sum = 0
            denom_sum = 0

            for pipe_index in range(num_pipes):

                q = discharge[pipe_index]
                resistance = resistances[pipe_index]
                num_sum += resistance * q * abs(q) * loop[pipe_index]
                denom_sum += 2 * resistance * abs(q) * abs(loop[pipe_index])

            error = num_sum / denom_sum
            errors.append(error)

        for loop_index in range(num_loops):

            for pipe_index in range(num_pipes):

                discharge[pipe_index] -= errors[loop_index] * weight[loop_index][pipe_index]

    return discharge


resistances = [2, 3, 2, 3, 3, 3, 2, 2, 3, 2,
               3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 2, 3, 2]

initial_discharge = [5, 35, 40, 5, 23, 40, 10, 20, 2, 22,
                     30, 30, 10, 10, 10, 20, 20, 30, 30, 20, 40, 30, 30]


# The weight here is used to check the direction of flow in a pipe with respect to a loop
# We assumed clockwise direction in each loop
# So a pipe with flow along the loop has weight set to 1, similarly -1 for flow in the opposite direction to loop, and 0 for absence of the pipe in the particular loop

weight = [[1, -1, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 1, -1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, -1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -1, -1, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 1, -1]]

iterations = 100

print(hardy_cross(resistances, initial_discharge, weight, iterations))