/** @jsx jsx */
import Head from "next/head"
import { jsx, Styled, Flex, Box } from "theme-ui"
import { Fragment } from "react"

import { useSubscriptionPlans } from "./hooks/useSubscriptionPlans"
import { withApollo } from "../../lib/apollo"
import { UserIcon, KitchenToolsIcon } from "../icons"
import { getUniqueValuesFromArray } from "../../helpers/functional"

function SubscriptionPlans() {
  const {
    queryResult,
    getSelectedSubscriptionPlan,
    handleSetParamValues,
  } = useSubscriptionPlans()

  const { data, error, loading } = queryResult

  function renderSubscriptionPlanSelector() {
    const { listPlans } = data

    if (!listPlans || !listPlans.length) {
      return <p>Nenhum plano foi encontrado. Por favor, tente novamente</p>
    }

    const paramsToChoose = [
      {
        name: "numberOfPeople",
        icon: <UserIcon size="32px" />,
        text: (
          <span>
            Receita para <br />
            quantas pessoas?
          </span>
        ),
        values: getUniqueValuesFromArray(
          listPlans.map(({ numberOfPeople }) => numberOfPeople)
        ),
      },
      {
        name: "weeklyRecipes",
        icon: <KitchenToolsIcon size="32px" />,
        text: (
          <span>
            Quantas receitas <br /> por semana?
          </span>
        ),
        values: getUniqueValuesFromArray(
          listPlans.map(({ weeklyRecipes }) => weeklyRecipes)
        ),
      },
    ]

    return (
      <Box
        bg="highlight"
        paddingY={"24px"}
        paddingX={"32px"}
        sx={{
          borderRadius: "10px",
        }}
      >
        {paramsToChoose.map(({ name, icon, text, values }) => (
          <Fragment key={name}>
            <Flex
              key={name}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <span sx={{ marginRight: "12px" }}>{icon}</span>
              <span sx={{ color: "accent" }}>{text}</span>
            </Flex>
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              {values.map((value) => (
                <Box
                  key={name + value}
                  sx={{
                    borderRadius: "10px",
                  }}
                  paddingY={"12px"}
                  paddingX={"20px"}
                  bg="primary"
                  color="white"
                  data-name={name}
                  data-value={value}
                  onClick={handleSetParamValues}
                >
                  <span sx={{ fontSize: "28px" }}>{value}</span>
                </Box>
              ))}
            </Flex>
          </Fragment>
        ))}
      </Box>
    )
  }

  return (
    <Box p={[3]}>
      <Head>
        <title>Woodspoon subscription plans that fit into your routine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p={2}>
        <Styled.h1>
          Configure o plano que{" "}
          <b>
            melhor encaixa na <br /> sua rotina
          </b>
        </Styled.h1>
      </Box>

      <Box bg="white" paddingBottom="24px">
        <Styled.img
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
          }}
          src="/images/bg1.jpg"
        />

        <Box marginY={32} paddingX={"16px"}>
          <Styled.h2>
            Gostou e ainda não é assinante? <br /> Escolha já um plano semanal!
          </Styled.h2>

          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p>error</p>
          ) : (
            renderSubscriptionPlanSelector()
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default withApollo({ ssr: true })(SubscriptionPlans)
