class Api::ContactsController < ApplicationController
    before_action :authenticate_user!

    def index
        @contacts = current_user.contacts.all
        render json: @contacts.order(:name)
    end

    def show    
        @contact = current_user.contacts.find(params[:id])
        render json: @contact
    end

    def create 
        @new_contact = current_user.contacts.new(contact_params)
        @new_contact.save!

        render json: @new_contact
    end

    def update 
        @contact = current_user.contacts.find(params[:id])
        @contact.update!(contact_params)
        render json: @contact
    end

    def destroy 
        current_user.contacts.find(params[:id]).destroy

        render json: {
            msg: "Contact Deleted"
        }
    end

    private 
    def contact_params
        params.require(:contact).permit(:name, :number, :email, :category)
    end
end
