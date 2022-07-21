let vitrine              = document.querySelector('main')
let tagSection           = document.querySelector('.vitrineCard')
let tagDivCard           = document.querySelector('.divCarrinhoPesquisa')
let tagUlCarrinho        = document.querySelector('.itensCarrinho')
let tagQuantidadeProduto = document.querySelector('.divquantidade')
let tagTotalProduto      = document.querySelector('.divtotal')
let quantidade           = document.querySelector('.quantidade')
let tagValor             = document.createElement('span')



 function loja(mercadorias){
    tagUl = document.createElement('ul')

    for(let i = 0; i < mercadorias.length; i++){

        let item = mercadorias[i]
        let card =  criarCard(item)

        tagUl.appendChild(card)
    }
    return tagUl
 }

 function criarCard(itens){

    let name        = itens.nameItem
    let img         = itens.img
    let description = itens.description
    let preco       = itens.value
    let button      = itens.addCart
    let categoria   = itens.tag
    let id          = itens.id

    let tagLi      = document.createElement('li')
    let tagImg     = document.createElement('img')
    let tagMain    = document.createElement('main')
    let tagSpan    = document.createElement('span')
    let tagH2      = document.createElement('h2')
    let tagP       = document.createElement('p')
    let tagStrong  = document.createElement('strong')
    let tagbutton  = document.createElement('button')

    tagLi.classList.add('card')
    tagImg.classList.add('imgcard')


    tagImg.src          = `${img}`
    tagImg.alt          = name
    tagSpan.innerText   = categoria
    tagH2.innerText     = name
    tagP.innerText      = description
    tagStrong.innerHTML = `R$ ${preco.toFixed(2)}`.replace('.',',')
    tagbutton.innerText = button
    tagbutton.setAttribute('id', id)

    tagMain.append(tagSpan, tagH2, tagP, tagStrong, tagbutton)
    tagLi.append(tagImg, tagMain)

    return tagLi
 }
 tagSection.appendChild(loja(data))
 vitrine.append(tagSection, tagDivCard)
 

tagUl.addEventListener('click', interceptarProdutos)

let carrinhoCompra = []

function interceptarProdutos(event){
   console.log(carrinhoCompra)
   let btnComprar = event.target

   if(btnComprar.tagName == 'BUTTON'){

       let idProduto = btnComprar.id
       let produto   = data.find(function(produto){

           if(produto.id == idProduto){
               return produto
           }
       })
       carrinhoCompra.push(produto)
       criarCardCarrinho(carrinhoCompra)
       somaTotal(carrinhoCompra)
    }
}

function removerProduto(event){

    let btnRemover = event.target

    if(btnRemover.tagName == 'BUTTON'){

        let index = btnRemover.id
        carrinhoCompra.splice(index, 1)

        let arrayLi = tagUlCarrinho.children

        let li = Array.from(arrayLi).find((li) => {
            return li.id == index
        })

        li.remove()
    }
}
tagUlCarrinho.addEventListener('click', removerProduto) 

function criarCardCarrinho(produto){
    tagUlCarrinho.innerHTML = ''

    for(let i = 0; i < produto.length; i++){

        let item = produto[i]
        let card = alimentarCard(item)

        tagUlCarrinho.appendChild(card)
    }
}

function alimentarCard(itensCarrinho){

    let name        = itensCarrinho.nameItem
    let img         = itensCarrinho.img
    let preco       = itensCarrinho.value
    let id          = itensCarrinho.id

    let tagLiCard      = document.createElement('li')
    let tagImgCard     = document.createElement('img')
    let tagMainCard    = document.createElement('main')
    let tagH2Card      = document.createElement('h2')
    let tagStrongCard  = document.createElement('strong')
    let tagbuttonCard  = document.createElement('button')

    tagLiCard.classList.add('cardCarrinho')

    tagImgCard.src = `${img}`
    tagImgCard.alt = name
    tagH2Card.innerText = name
    tagStrongCard.innerHTML = `R$ ${preco.toFixed(2)}`.replace('.',',')
    tagbuttonCard.innerText = 'Remover Produto'
    tagbuttonCard.setAttribute('id', id)
    tagLiCard.setAttribute('id', id)


    tagMainCard.append(tagH2Card, tagStrongCard, tagbuttonCard)
    tagLiCard.append(tagImgCard, tagMainCard)
    
    return tagLiCard
}

function somaTotal(){

    function somaCompra(produtos){
        let soma = 0

        for(let i = 0; i < produtos.length; i++){

            let somaItem = produtos[i]
            soma += somaItem.value
        }
        return soma
    }

    function quantidadeItens(produtos){
        let somaQuantidade = 0

        for(let i = 0; i < produtos.length; i++){

            somaQuantidade += 1
        }
        return somaQuantidade
    }

    quantidade.innerHTML =  `${quantidadeItens(carrinhoCompra)}` 
    tagValor.innerHTML      = `R$ ${somaCompra(carrinhoCompra).toFixed(2)}`.replace('.',',')

    tagQuantidadeProduto.appendChild(quantidade)
    tagTotalProduto.appendChild(tagValor)
}

 /*                     <li class="vazio">
                        <figure>
                            <img src="./imgTaina/empty-cart.png" alt="Carrinho Vazio">
                            <figcaption>Adicione itens</figcaption>
                        </figure>    
                    </li>
 */



