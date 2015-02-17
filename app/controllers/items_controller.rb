class ItemsController < ApplicationController
  before_action :load_items
  def index
    return render json: @items.to_json
  end

  def item_names
    updated_items = []
    @items.each do |item|
      updated_items << {id: item.id, name: item.name}
    end
    return render json: updated_items
  end

  def filtered_items
    updated_items = []
    @items.each do |item|

      if params[:search_name].present?  
        name = params[:search_name]
        name_res = /#{name}/i.match(item.name).present?
      end
      
      if params[:ids].present?
        id_res = params[:ids].index(item.id.to_s).present? 
      end      
      
      if name_res || id_res
        updated_items << {id: item.id, name: item.name, description: item.description, image: item.image }
      end
    end
    render json: updated_items
  end
  
  private
  def load_items
    @items = Item.all
  end
end
