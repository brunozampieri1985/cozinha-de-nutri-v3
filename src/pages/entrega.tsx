import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import Button from '@components/Button'
import Router from 'next/router'

const Entrega: NextPage = () => {
   return (
      <PageLayout>
         <div className="delivery">
            <div className="delivery-info">
               <h1>Política de Entregas</h1>
               <hr />
               <br />
               <p>
                  Visando sempre fornecer os produtos com a maior qualidade
                  possível, não mantemos estoque, fazemos sob encomenda. Por
                  esse motivo, solicitamos atenção conforme abaixo:
               </p>
               <ul>
                  <li>
                     Pedidos confirmados até às 13h00 de segunda-feira serão
                     entregues na quarta-feira seguinte até as 18h00.
                  </li>
                  <li>
                     Pedidos confirmados até às 13h00 de quarta-feira serão
                     entregues na sexta-feira seguinte até as 18h00.
                  </li>
               </ul>
               <h3>Taxa de Entrega</h3>
               <p>
                  A taxa de entrega é de R$ 6,00. Para compras acima de R$
                  100,00, o frete é <strong>Gráis!</strong>
               </p>
               <div>
                  <Button onClick={() => Router.push('/')}>
                     Voltar para Loja
                  </Button>
               </div>
            </div>
         </div>
      </PageLayout>
   )
}

export default Entrega
