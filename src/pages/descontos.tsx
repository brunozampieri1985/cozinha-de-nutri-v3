import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import Button from '@components/Button'
import Router from 'next/router'

const Descontos: NextPage = () => {
   return (
      <PageLayout title={'Descontos'}>
         <div className="info-page-wrapper">
            <div className="page-info">
               <h1>Política de Descontos</h1>
               <hr />
               <br />
               <p>
                  Veja abaixo nossa tabela de descontos.{' '}
                  <strong>APROVEITE!</strong>
               </p>
               <p>
                  Basta adicionar os itens ao carrinho que o desconto é
                  calculado automaticamente!
               </p>
               <div className="discount-table">
                  <table>
                     <thead>
                        <th>Quantidade</th>
                        <th>Desconto</th>
                     </thead>
                     <tbody>
                        <tr>
                           <td>
                              Até <strong>6</strong> marmitas
                           </td>
                           <td>
                              <strong>0%</strong>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              De <strong>7</strong> até <strong>13</strong>{' '}
                              marmitas
                           </td>
                           <td>
                              <strong>5%</strong>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              De <strong>14</strong> até <strong>20</strong>{' '}
                              marmitas
                           </td>
                           <td>
                              <strong>10%</strong>
                           </td>
                        </tr>
                        <tr>
                           <td>
                              A partir de <strong>21</strong> marmitas
                           </td>
                           <td>
                              <strong>15%</strong>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

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

export default Descontos
